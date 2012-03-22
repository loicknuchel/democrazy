require File.join(File.dirname(__FILE__),"dcz")

def api
  Dcz::Api.new
end

def www
  Dcz::Www.new
end

app = Rack::URLMap.new({
  "/www/" => www,
  "/" => api,
})

run app
