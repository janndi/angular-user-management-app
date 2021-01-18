import { LABELS } from "../assests.config";
import main from "./default";

import { environment } from "src/environments/environment";

function resolve(label: string): any {
  switch (label) {
    case LABELS.main:
      return main;
  }
}

export type IMAGES_MODEL = typeof main;
export const IMAGES: IMAGES_MODEL = resolve(environment.LABEL);

export default IMAGES;
