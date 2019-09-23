class TopPagesController < ApplicationController
  include Common
  before_action :setup, only: [:home]

  def home
    @url = 'https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=' + @client_id.to_s + '&redirect_uri=http%3a%2f%2flocalhost%3a3000%2fposts%2fshow&state=12345abcde&scope=openid%20profile'
  end
end
