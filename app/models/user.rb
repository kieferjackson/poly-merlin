class User < ApplicationRecord
    # has_secure_password
    def authenticate(password)
        return self.password == password
    end
    validates :username, presence: true
    validates :password, presence: true, length: { minimum: 10 }
end
