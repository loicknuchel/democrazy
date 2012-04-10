module Dcz class Www

  get("/about/?") do
    render(:about)
  end

  get("/index/?") do
    render(:index)
  end

  get("/other/?") do
    render(:other)
  end

  get("/results/?") do
    render(:results)
  end

  get("/scrutins/?") do
    render(:scrutins)
  end

  get("/vote/?") do
    render(:vote)
  end

end end
