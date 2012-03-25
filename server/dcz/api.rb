module Dcz; class Api < Sinatra::Base

  set(CFG[:sinatra_settings])
  mime_type(:json,"application/json")
  mime_type(:js,"text/javascript")
  mime_type(:html,"text/html")
  configure{Ohm::connect(CFG[:redis])}

  before do
    puts "REQUEST: #{request}" if CFG[:debug]
    content_type(:json)
  end

  helpers do
    def jsonp(obj)
      json = obj.to_json
      if (cbk = params.delete("callback"))
         content_type(:js)
         "#{cbk}(#{json})"
       else
         json
       end
    end
  end

  ASE::require_part %w{ in out }

end end
