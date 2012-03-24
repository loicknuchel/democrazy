module Dcz class Www

  get("/info/?") do |x|
    render(:info)
  end

  get("/results/?") do |x|
    r = ""
    vote_p2012.results_info.each do |rs|
      maxPc = rs[:results].map{|x| x.score}.max
      r += <<-EOD
             <div class="scrutin" id="#{rs[:electionId]}">
             <div class="name"><img src="img/info32.png" class="infoscrutin"/>#{rs[:electionType]}</div>
             <div class="winner"><img src="#{rs[:results].first[:piclink_anim]}" /></div>
             <div class="resultats">
           EOD
      rs[:results].each do |cd|
        r += <<-EOD
               <div class="head"><img src="#{cd[:piclink_anim]}" /></div>
               <div class="bar">
                <div class="load" style="width: #{(cd[:score]*100/maxPc).round}%;"></div>
                <div class="name">#{cd[:name]}</div>
                <div class="pc">#{cd[:score]}#{cd[:unit]}</div>
               </div><br/>
             EOD
      end
      r += '</div></div>'
    end
    r += '<div class="clear"></div>'
    render(:results,{results: r})
  end

  get("/first_turn/?") do |x|
    r = ""
    k = 0
    cd_info.each do |cd|
      r += <<-EOD
             <div class="candidat" id="#{cd[:voxe_id]}">
              <div class="pic" style="background: url(#{cd[:piclink72]});"></div>
              <div>#{cd[:name]}</div>
              <div class="infocandidatdiv">
               <a target="#{cd[:voxe_id]}" href="#{cd[:urlinfo]}">
                <img src="img/info32.png" class="infocandidat"/>
               </a>
              </div>
             </div>
           EOD
    end
    if k == 2
      r += '<div class="clear"></div>'
      k = 0
    else
      k += 1
    end
    r += '<div class="clear"></div>'
    render(:first_turn,{candidates: r})
  end

  get("/order_candidates/?") do |x|
    r = ""
    cd_info.each do |cd|
      r += <<-EOD
             <li id="#{cd[:voxe_id]}" class="ui-state-default">
              <img align="left" src="#{cd[:piclink72]}" />
              <span class="ui-icon ui-icon-arrowthick-2-n-s"></span>
              <div>#{cd[:name]}</div>
             </li>
           EOD
    end
    vote_p2012.candidates.each.map_m(:info) do |cd|
    render(:order_candidates,{candidates: r})
  end

end end
