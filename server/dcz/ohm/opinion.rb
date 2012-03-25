#encoding: utf-8

module Dcz class Opinion

  attribute(:oid,String); index(:oid)
  reference(:vote,Vote)
  list(:order,Candidate)
  reference(:fstvote,Candidate)
  attribute(:email,String)
  attribute(:confirmation_id,String); index(:confirmation_id)
  attribute(:confirmed,Boolean)

  EMAIL_RXP = /^[\w.!\#$%&'*+\-\/=?\^`{|}~]+@[\w-]+(\.[\w-]+)*$/i

  class << self

    def make(oid)
      raise unless find(oid: oid).empty?
      r = create({
        oid: oid,
        confirmation_id: String::rand_alphanum(16),
        confirmed: false,
      })
      r.save
      r.send_cmail if r.valid_email?
      r
    end

    def all_complete
      all.to_a.reject{ |x| !x.complete? }
    end

    def get_by_confirmation_id(id)
      r = find(confirmation_id: id)
      raise if r.size > 1
      r.first
    end

  end

  def destroy!
    vote.opinions.delete(self)
    delete
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

  def valid_email?
    !!EMAIL_RXP.match(email)
  end

  def confirm!
    self.confirmed = true
    save
  end

  def complete?
     # confirmed && fstvote && order.size == Candidate.all.size
     fstvote && order.size == Candidate.all.size
  end

  def send_cmail
    link = "http://democrazy.fr/confirm-vote/#{confirmation_id}"
    body = [
      "Bonjour,",
      "vous recevez cet email en raison de votre participation à l'expérience",
      "démocratique http://democrazy.fr",
      "",
      "Pour valider votre vote, merci de cliquer sur ce lien :",
      link,
      "",
      "Merci de votre intérêt pour notre projet,",
      "",
      "-- ",
      "L'équipe de Democrazy"
    ].join("\n")
    Pony.mail({
      to: email,
      from: "team@democrazy.fr",
      subject: "Confirmez votre vote sur Democrazy",
      body: body,
      charset: "UTF-8",
    })
    puts "New activation link for #{email}: #{link}"
  end

end end
