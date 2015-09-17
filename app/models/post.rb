class Post < ActiveRecord::Base
  has_many :comments, dependent: :destroy

  validates_length_of :title, minimum: 5, maximum: 255
  validates_length_of :body, minimum: 5
end
