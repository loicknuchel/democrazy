module Dcz class Www

  get("/confirm-vote/:x/?") do |x|
    opinion = Opinion.get_by_confirmation_id(x)
    opinion.confirm!
    render(:confirm)
  end

end end
