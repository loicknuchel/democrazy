module Dcz class Vote

  attribute(:name,String); index(:name)
  attribute(:voxe_id,String); index(:voxe_id)
  set(:candidates,Candidate)
  set(:opinions,Opinion)
  reference(:condorcet_winner,Candidate)
  attribute(:condorcet_generation,Integer)

  class << self

    def make(pp={})
      r = create({
        name: pp[:name],
        voxe_id: pp[:voxe_id],
      })
      r.save; r
    end

    def get_by_name(name)
      r = find(name: name)
      raise if r.size > 1
      r.first
    end

    def get_by_voxe_id(id)
      r = find(voxe_id: id)
      raise if r.size > 1
      r.first
    end

  end

  def complete_opinions
    opinions.to_a.reject{ |x| !x.complete? }
  end

  def add_candidate(candidate)
    candidate.votes << self
    candidates << candidate
    candidate.save
    save
  end

  def add_opinion(oid)
    o = Opinion.make(oid)
    o.vote = self
    o.save
    opinions << o
    save
    o
  end

  def add_full_opinion(oid,ids,fstvote_id=nil)
    fstvote_id ||= ids.first
    cds = ids.map{ |id| Candidate.get_by_voxe_id(id) }
    fstvote = Candidate.get_by_voxe_id(fstvote_id)
    o = add_opinion(oid)
    o.vote = self
    cds.each{ |x| o.order << x }
    o.fstvote = fstvote
    opinions << o
    o.save
    save
    o
  end

  def get_opinion(oid)
    r = opinions.find(oid: oid)
    raise if r.size > 1
    r.first
  end

  def voxe_update_candidates!
    Voxe.election(voxe_id)[:response][:election][:candidacies].each do |x|
      y = x[:candidates].first
      if (cd = Candidate.get_by_voxe_id(y[:id]))
        puts "Adding existing candidate #{cd.name}"
        add_candidate(cd)
      else
        name = "#{y[:firstName]} #{y[:lastName]}"
        puts "Adding new candidate #{name}"
        add_candidate(Candidate.make({
          name: name,
          voxe_id: y[:id],
        }))
      end
    end
  end

  def scoremap(list)
    s = {}
    list.to_a.each{ |x| s[x] = 0 }
    s
  end

  def ranked(scoremap)
    scoremap.sort{ |x,y| y.second <=> x.second }
  end

  def sorted_candidates_in_whitelist(whitelist)
    s = scoremap(whitelist)
    complete_opinions.each do |x|
      x.order.each do |y|
        if whitelist.include?(y)
          s[y] += 1
          break
        end
      end
    end
    ranked(s)
  end

  def solve_uninominal_one_turn_nobias
    sorted_candidates_in_whitelist(Candidate.all.to_a)
  end

  def solve_uninominal_two_turns_nobias
    st1 = solve_uninominal_one_turn_nobias
    winner = st1.first.first
    challenger = st1.second.first
    sorted_candidates_in_whitelist([winner,challenger])
  end

  def solve_uninominal_one_turn_bias
    s = scoremap(Candidate.all)
    complete_opinions.each do |x|
      s[x.fstvote] += 1
    end
    ranked(s)
  end

  def solve_uninominal_two_turns_bias
    st1 = solve_uninominal_one_turn_bias
    winner = st1.first.first
    challenger = st1.second.first
    sorted_candidates_in_whitelist([winner,challenger])
  end

  def solve_elimination
    whitelist = Candidate.all.to_a.clone
    s = []
    until whitelist.empty?
      ts = sorted_candidates_in_whitelist(whitelist)
      min = ts.last.second
      while ts.last && ts.last.second == min do
        s.insert(0,ts.last)
        whitelist.delete(ts.last.first)
        ts.delete_at(-1)
      end
    end
    s
  end

  def solve_borda
    s = scoremap(Candidate.all)
    tc = Candidate.all.size
    complete_opinions.each do |x|
      c = tc
      x.order.each do |y|
        s[y] += c
        c -= 1
      end
    end
    ranked(s)
  end

  ## CONDORCET

  def defeat_to_str(cs)
    "#{cs.first.id}-#{cs.second.id}".to_sym
  end

  def defeats_set_to_strset(set)
    ::Set.new(set.map{ |cs| defeat_to_str(cs) })
  end

  def defeat_strength(cs)
    c1,c2 = cs.first,cs.second
    strength = 0
    complete_opinions.each do |x|
      x.order.each do |y|
        if y == c1
          strength += 1
          break
        elsif y == c2
          break
        end
      end
    end
    strength
  end

  def weakest_defeats(set)
    r = ::Set.new
    strength = {}
    set.each do |x|
      weakest = true
      set.each do|y|
        strength[x] ||= defeat_strength(x)
        strength[y] ||= defeat_strength(y)
        if ( (strength[x] == strength[y]) &&
             ( defeat_strength([x.second,x.first]) < defeat_strength([y.second,y.first]) ) ) ||
           (strength[x] > strength[y])
          weakest = false
          break
        end
      end
      r << x if weakest
    end
    r
  end

  def in_schwartz(c,s)
    Candidate.all.each do |x|
      if x != c
        unless s.include?(defeat_to_str([c,x])) || !s.include?(defeat_to_str([x,c]))
          return false
        end
      end
    end
    true
  end

  def condorcet_pairwise_defeats(candidates)
    matches = candidates.to_a.combination(2)
    pairwise_defeats = ::Set.new
    matches.each do |c1,c2|
      v1,v2 = 0,0
      complete_opinions.each do |x|
        x.order.each do |y|
          if y == c1
            v1 += 1
            break
          elsif y == c2
            v2 += 1
            break
          end
        end
      end
      if v1 > v2
        pairwise_defeats << [c1,c2]
      elsif v2 > v1
        pairwise_defeats << [c2,c1]
      end
    end
    pairwise_defeats.clone
  end

  def condorcet_schwartz_set(candidates,pairwise_defeats)
    transitive_defeats = pairwise_defeats.clone
    transitive_defeats_str =  defeats_set_to_strset(transitive_defeats)
    begin
      new_defeats = ::Set.new
      transitive_defeats.combination(2).each do |d1,d2|
        s1,s2 = defeat_to_str(d1),defeat_to_str(d2)
        pair1,pair2 = [d1.first,d2.second],[d2.first,d1.second]
        pair1s,pair2s = defeat_to_str(pair1),defeat_to_str(pair2)
        if d1.second == d2.first && !transitive_defeats_str.include?(pair1s)
          new_defeats << pair1
          transitive_defeats << pair1
          transitive_defeats_str << pair1s
        elsif d2.second == d1.first && !transitive_defeats_str.include?(pair2s)
          new_defeats << pair2
          transitive_defeats << pair2
          transitive_defeats_str << pair2s
        end
      end
    end until new_defeats.empty?
    schwartz_set = ::Set.new
    candidates.each do |c|
      if in_schwartz(c,transitive_defeats_str)
        schwartz_set << c
      end
    end
    schwartz_set
  end

  def solve_condorcet_real
    round = 0
    cds = Candidate.all
    puts "====> starting Condorcet match with #{cds.size} candidates " +
         "and #{complete_opinions.size} votes."
    puts "#{cds.to_a.map_m(:name).join(', ')}"
    defeats = condorcet_pairwise_defeats(cds)
    while cds.size > 1
      sset = condorcet_schwartz_set(cds,defeats)
      cds = sset
      break if cds.size < 2
      round += 1
      puts "====> round #{round}, #{cds.size} candidates still fighting."
      puts "#{cds.to_a.map_m(:name).join(', ')}"
      defeats.each do |x|
        if !sset.include?(x.first) && !sset.include?(x.second)
          defeats.delete(x)
        end
      end
      d0 = defeats.size
      weakest_defeats(defeats).each do |x|
        defeats.delete(x)
      end
      puts "====> defeats #{d0} -> #{defeats.size}"
      break if defeats.empty? || (d0 == defeats.size)
    end
    puts "Over with #{cds.size} winner(s): #{cds.first.name}"
    [[cds.first,100]]
  end

  def solve_condorcet_cached
    [[condorcet_winner,100]]
  end

end end

#vote.solve_condorcet # TODO REMOVE
