# encoding: utf-8

module Dcz class Api

  get("/:vid/candidates/?") do |vid|
    jsonp(Vote.get_by_voxe_id(vid).candidates.map_m(:info))
  end

  def scoremap_to_results(scoremap)
    scoremap.map do |x|
      x.first.info.merge(score: x.second,unit: "")
    end
  end

  def normalized_scoremap_to_results(scoremap)
    s = scoremap.inject(0){|s,x| s+x.second}
    scoremap.map do |x|
      x.first.info.merge(score: ((100*x.second.to_f)/s).round,unit: "%")
    end
  end

  get("/:vid/results/?") do |vid|

    vote = Vote.get_by_voxe_id(vid)

    uninominal_one_turn = {
      electionType: "Système actuel, 1er tour",
      electionId: 1,
      results: normalized_scoremap_to_results(vote.solve_uninominal_one_turn_bias),
    }

    uninominal_two_turns = {
      electionType: "Système actuel, 2e tour",
      electionId: 2,
      results: normalized_scoremap_to_results(vote.solve_uninominal_two_turns_bias),
    }

    elimination = {
      electionType: "Scrutin par élimination",
      electionId: 3,
      results: scoremap_to_results(vote.solve_elimination),
    }

    borda = {
      electionType: "Méthode de Borda",
      electionId: 4,
      results: scoremap_to_results(vote.solve_borda),
    }

    ago = (Time.at vote.condorcet_generation).ago_in_words

    condorcet = {
      electionType: "Méthode de Condorcet (updated #{ago})",
      electionId: 5,
      results: normalized_scoremap_to_results(vote.solve_condorcet_cached),
    }

    r = {
      results: [
        uninominal_one_turn,
        uninominal_two_turns,
        elimination,
        borda,
        condorcet
      ],
      nb_votes: vote.opinions.all.size,
    }

    jsonp(r)
  end

end end
