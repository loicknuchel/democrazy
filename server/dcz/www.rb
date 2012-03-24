module Dcz; class Www < Sinatra::Base

  set(CFG[:sinatra_settings])
  mime_type(:json,"application/json")
  mime_type(:js,"text/javascript")
  mime_type(:html,"text/html")
  configure{Ohm::connect(CFG[:redis])}

  before do
    puts "REQUEST: #{request}" if CFG[:debug]
    content_type(:html)
  end

  TPL = {}

  # Helpers

  def render(tpl,h={})
    unless TPL[tpl]
      TPL[tpl] = String::from(File.join(CFG[:path][:tpl],"#{tpl}.mustache"))
    end
    Mustache.render(TPL[tpl],h)
  end

  def vote_p2012
    Vote.get_by_voxe_id("4f16fe2299c7a10001000012")
  end

  def cd_info
    vote_p2012.candidates.map_m(:info)
  end

  # / Helpers

  ASE::require_part %w{ mail pages }

  get("/") do
    render(:index)
  end

end end
