import { format, transports } from "winston";

export function options(scenarionName: string) {
  return {
    transports: [
      new transports.File({
        filename: `test-results/logs/${scenarionName}/log.log`,
        level: "info",
        format: format.combine(
          format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
          format.align(),
          format.printf(
            (info) => `${info.timestamp} ${info.level}: ${info.message}`
          )
        ),
      }),
    ],
  };
}
