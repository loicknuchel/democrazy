module Dcz class Opinion

  attribute(:oid,String); index(:oid)
  reference(:vote,Vote)
  list(:order,Candidate)
  reference(:fstvote,Candidate)
  attribute(:email,String)

  class << self

    def make(oid)
      r = create({oid: oid})
      r.save; r
    end

    def all_complete
      all.to_a.reject{ |x| !x.complete? }
    end

  end

  def set_fstvote(cid)
    c = Candidate.get_by_voxe_id(cid)
    self.fstvote = c
    save
  end

  def set_order(new_order)
    cs = new_order.map{ |id| Candidate.get_by_voxe_id(id) }
    order.pop until order.empty?
    cs.each{ |x| order << x }
    save
  end

  def set_email(x)
    self.email = x
    save
  end

  def complete?
    fstvote && order.size == Candidate.all.size
  end

end end
