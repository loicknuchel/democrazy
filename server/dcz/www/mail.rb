module Dcz class Www

  get("/confirm-vote/:x/?") do |x|
    opinion = Vote.get_by_confirmation_id(x)
    opinion.confirm!
    "done"
  end

end end
