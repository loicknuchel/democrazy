module Dcz
  class Vote < Ohm::Model; include Ohm::Typecast; end
  class Candidate < Ohm::Model; include Ohm::Typecast; end
  class Opinion < Ohm::Model; include Ohm::Typecast; end
  ASE::require_part %w{vote candidate opinion}
end
