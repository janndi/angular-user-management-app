import { LABELS } from "../assests.config"
import Default from "./default"

import { environment } from 'src/environments/environment';

function resolve(label: string): any {
  switch (label) {
    case LABELS.main:
      return Default
  }
}

export type COLORS_MODEL = typeof Default
export const COLORS: COLORS_MODEL = resolve(environment.LABEL)

export default COLORS