# encoding: utf-8

module Dcz; class << self

  def cleanup!
    Vote.all.each{|x| x.delete}
    Opinion.all.each{|x| x.delete}
    Candidate.all.each{|x| x.delete}
  end

  def preseed!
    puts "Seeding..."
    vote = Vote.make({
      name: "Présidencielle 2012",
      voxe_id: "4f16fe2299c7a10001000012",
    })
    vote.voxe_update_candidates!
    puts "Done."
  end

  def add_random_opinion!
    vote = Vote.get_by_voxe_id("4f16fe2299c7a10001000012")
    x = vote.candidates.all.map_m(:voxe_id)
    order = []
    until x.empty?
      o = x.pick
      x.delete(o)
      order << o
    end
    vote.add_full_opinion(String::rand_alphanum(32),order)
  end

  def update_condorcet!
    vote = Vote.get_by_voxe_id("4f16fe2299c7a10001000012")
    winner = vote.solve_condorcet_real.first
    vote.condorcet_winner = winner.first
    vote.condorcet_generation = Time.now.to_i
    vote.save
    true
  end

end end
