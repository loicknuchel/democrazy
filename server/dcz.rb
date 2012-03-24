module Dcz

  require "as-extensions"

  ASE::need %w{
    mustache ohm ohm/contrib pony rufus/verbs sinatra/base time-ago-in-words
  }

  root = File.expand_path(File.dirname(__FILE__))

  CFG = {

    debug: true,

    redis: {
      path: "/tmp/redis.sock",
    },

    sinatra_settings: {
      bind: "127.0.0.1",
      dump_errors: true,
      environment: :production,
      logging: true,
      public_folder: "#{root}/public",
    },

    root_url: "http://democrazy.fr",

  }

  ASE::require_part %w{ api helpers ohm voxe www }

end
