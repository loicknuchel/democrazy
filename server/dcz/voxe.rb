module Dcz module Voxe; class << self

  include Rufus::Verbs

  def ep
    @ep ||= EndPoint.new({
      host: "voxe.org",
      port: 80,
      resource: "api/v1"
    })
  end

  def election(id)
    res = ep.get(id: "elections/#{id}")
    raise unless res.code.to_i == 200
    Map(JSON.parse(res.body))
  end

end end end
