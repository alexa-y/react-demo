class Comment < ActiveRecord::Base
  belongs_to :post

  validates_length_of :body, minimum: 5
  validates_presence_of :post
end
