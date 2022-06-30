require 'net/http'
require 'json'

res = Net::HTTP.get(URI("https://raw.githubusercontent.com/bonusly/gemojione/master/config/index.json"))

json = JSON.parse(res)

emojis = []
json.values.each do |emoji|
  push = lambda do |code|
    emojis << { code: code, name: emoji["moji"] }
  end

  push.(emoji["shortname"])
  emoji["aliases"].each { push.(_1) }
end

File.open(__dir__ + "/emojis_data.ts", "w") do |file|
  file.puts(%|export default {|)
  file.puts(%|  "emojis": [|)

  emojis
    .reject { _1[:name].unpack("U*").include?(8205) } # "<200d>と表示ができないものを除く
    .each_with_index { file.print(",\n") if _2.positive?; file.print("    " + JSON.dump(_1)) }
  file.print("\n")

  file.puts(%|  ]|)
  file.puts(%|}|)

  puts file.path
end
