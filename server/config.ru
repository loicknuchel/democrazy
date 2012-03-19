require File.join(File.dirname(__FILE__),"dcz")

def api
  Dcz::Api.new
end

app = Rack::URLMap.new({
  "/" => api,
})

run app
