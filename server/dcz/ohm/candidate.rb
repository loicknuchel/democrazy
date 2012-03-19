module Dcz class Candidate

  attribute(:name,String)
  attribute(:voxe_id,String); index(:voxe_id)
  set(:votes,Vote)

  PROGRAM_URL = Map({
    "4f1ec52d997d28000100000b" => "http://www.nathalie-arthaud.info/",
    "4ef479fdbc60fb000400026e" => "http://www.bayrou.fr/",
    "4f298b733f56cd0008000014" => "http://www.cheminade2012.fr/Preface_00434",
    "4f1888db5c664f0001000118" => "http://www.debout-la-republique.fr/projet-presidentiel-de-nicolas-dupont-aignan-31-propositions",
    "4f188a58f8104a0001000003" => "http://francoishollande.fr/",
    "4f1887545c664f000100010e" => "http://evajoly2012.fr/",
    "4f1491280bc89a0001000002" => "http://www.marinelepen2012.fr/le-projet/",
    "4f188a20f8104a0001000001" => "http://www.lhumaindabord2012.fr/",
    "4f1ec53d997d28000100000c" => "http://poutou2012.org/-Dossiers-",
    "4ef479fdbc60fb0004000264" => "http://statique.lemouvementpopulaire.fr/DIVERS/Supp.Mag%2055-Projet_2012_bdf.pdf",
  })

  class << self

    def make(pp={})
      r = create({
        name: pp[:name],
        voxe_id: pp[:voxe_id],
      })
      r.save; r
    end

    def get_by_voxe_id(id)
      r = find(voxe_id: id)
      raise if r.size > 1
      r.first
    end

  end

  def image_url(imgf)
    "#{CFG[:root_url]}/images/#{imgf}/#{name.sanitize_dashes.underscore}.png"
  end

  def info
    {
      voxe_id: voxe_id,
      name: name,
      piclink72: image_url("candidats72"),
      piclink_anim: image_url("candidats_anim"),
      urlinfo: PROGRAM_URL[voxe_id],
    }
  end

end end
