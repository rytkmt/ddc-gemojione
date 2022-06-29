import {
  BaseSource,
  Candidate,
} from "https://deno.land/x/ddc_vim@v0.17.0/types.ts";
import {
  assertEquals,
} from "https://deno.land/x/ddc_vim@v0.17.0/deps.ts#^";
import {
  GatherCandidatesArguments,
} from "https://deno.land/x/ddc_vim@v0.17.0/base/source.ts#^";
import json from "./emojis_data.ts"

type Gemojione = {
  code:        string;
  description: string;
  name:        string;
}

export type CompleteMetadata = {
  code:        string; // i.e. :fire:
  name:        string; // emoji
  description: string; // An explanation of which emoji have what git meaning.
}

type Params = {
  altCodes: Record<string, string>;
}

function getGemojione(params: Params): CompleteMetadata[] {
  return json.emojis
    .map((data: Gemojione) => {
      const altCodes = params.altCodes;
      const code = data.code in altCodes ? altCodes[data.code] : data.code;
      return {
        code: code,
        name: data.name,
        description: data.description
      };
    }
    );
}

export class Source extends BaseSource<Params> {
  async gatherCandidates(
    args: GatherCandidatesArguments<Params>
  ): Promise<Candidate<CompleteMetadata>[]> {
    const params = args.sourceParams as unknown as Params;
    const candidates = getGemojione(params);
    const ddcCandidates = candidates.flatMap(data => ({
      word: data.code,
      abbr: data.name,
      kind: data.description,
      user_data: {
        code: data.code,
        name: data.name,
        description: data.description,
      },
    }));
    return ddcCandidates;
  }

  params(): Params {
    return {
      altCodes: {},
    };
  }
}

Deno.test("gemojione", () => {
  assertEquals(json.emojis[0].code, ":man_raising_hand_tone3:");
});
