import fs from "fs";
import path from "path";

interface LocatorMapping {
  oldLocator: string;
  newLocator: string;
  usageCount: number;
  lastUsed: string;
}

export class LocatorRepository {
  private static filePath = path.join(__dirname, "locator-history.json");

  static getLocator(oldLocator: string): string | null {
    const data = this.readMappings();

    const match = data.find((x) => x.oldLocator === oldLocator);

    return match ? match.newLocator : null;
  }

  static saveLocator(oldLocator: string, newLocator: string): void {
    const data = this.readMappings();

    const exists = data.some((x) => x.oldLocator === oldLocator);

    if (!exists) {
      data.push({
        oldLocator,
        newLocator,
        usageCount: 1,
        lastUsed: new Date().toISOString(),
      });

      fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
    }
  }

  private static readMappings(): LocatorMapping[] {
    if (!fs.existsSync(this.filePath)) {
      return [];
    }

    const content = fs.readFileSync(this.filePath, "utf-8");

    return JSON.parse(content) as LocatorMapping[];
  }
}
