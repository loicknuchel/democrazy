module Dcz class Www

  get("/data-export/?") do
    vote = Vote.get_by_voxe_id("4f16fe2299c7a10001000012")
    r = CSV.generate(col_sep: ';',force_quotes: true) do |csv|
      csv << ["first turn"] + 1.upto(vote.candidates.size).map_m(:to_s)
      vote.complete_opinions.each do |x|
        csv << [x.fstvote.name] + x.order.map_m(:name)
      end
    end
    content_type(:csv)
    r
  end

end end
