class CopolymerSeries < ApplicationRecord
  belongs_to :func_group_a, :class_name => 'FuncGroup'
  belongs_to :func_group_b, :class_name => 'FuncGroup'
  belongs_to :user
end
