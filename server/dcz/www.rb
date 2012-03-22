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

  ASE::require_part %w{ mail }

  get("/") do
    content_type(:html)
    pf = CFG[:sinatra_settings][:public_folder]
    String::from("#{pf}/index.html")
  end

end end
