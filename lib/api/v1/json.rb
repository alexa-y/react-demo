module Api::V1::Json
  def api_json(obj, opts = {})
    obj.as_json(opts)
  end
end
