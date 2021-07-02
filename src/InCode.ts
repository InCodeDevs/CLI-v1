/**
 * @author Ben Siebert
 * @copyright 2018-2021 Ben Siebert. All rights reserved.
 */

import { Logger } from './util/Logger';

let logger: Logger = new Logger();

logger.setLogStatus(true, true, true)

logger.log("Hello World")
