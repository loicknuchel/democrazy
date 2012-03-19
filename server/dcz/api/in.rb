module Dcz class Api

  get("/:vid/opinion/:oid/set_firstturn/?") do |vid,oid|
    vote = Vote.get_by_voxe_id(vid)
    opinion = vote.get_opinion(oid) || vote.add_opinion(oid)
    opinion.set_fstvote(params[:candidate])
    if !params[:email].blank?
      opinion.set_email(params[:email])
    end
    jsonp({code: 200})
  end

  get("/:vid/opinion/:oid/set_order/?") do |vid,oid|
    vote = Vote.get_by_voxe_id(vid)
    opinion = vote.get_opinion(oid) || vote.add_opinion(oid)
    opinion.set_order(params[:candidates].split(","))
    jsonp({code: 200})
  end

end end
