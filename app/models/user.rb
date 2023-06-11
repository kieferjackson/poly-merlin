class User < ApplicationRecord
    has_many :func_groups, :class_name => 'FuncGroup', :foreign_key => 'func_group_id'
    has_many :copolymer_series, :class_name => 'CopolymerSeries', :foreign_key => 'copolymer_series_id'
    
    # has_secure_password
    def authenticate(password)
        return self.password == password
    end
    validates :username, presence: true
    validates :password, presence: true, length: { minimum: 10 }
end
