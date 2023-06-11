class Current < ActiveSupport::CurrentAttributes
    # Makes the current user stored in session accessible in views
    attribute :user
end