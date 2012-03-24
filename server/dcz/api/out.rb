# encoding: utf-8

module Dcz class Api

  get("/:vid/candidates/?") do |vid|
    jsonp(Vote.get_by_voxe_id(vid).candidates.map_m(:info))
  end

  get("/:vid/results/?") do |vid|
    jsonp(Vote.get_by_voxe_id(vid).results_info)
  end

end end
