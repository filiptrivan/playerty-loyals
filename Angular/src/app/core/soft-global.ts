import { Action, Column } from "./components/soft-data-table/soft-data-table.component";

export class SoftGlobal {
  static capitalizeFirstLetter(inputString: string): string {
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
  }

  // static getMonth(number: number): string {
  //   const months: string[] = [
  //     "January", "February", "March", "April", "May", "June",
  //     "July", "August", "September", "October", "November", "December"
  //   ];
    
  //   if (number < 1 || number > 12) {
  //     throw new Error("Invalid month number. It should be between 1 and 12.");
  //   }
    
  //   return months[number - 1];
  // }

  static getMonth(numberOfTheMonth: number): string {
    const meseci: string[] = [
      "Januar", "Februar", "Mart", "April", "Maj", "Jun",
      "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"
    ];
    
    if (numberOfTheMonth < 1 || numberOfTheMonth > 12) {
      console.error("Nevažeći broj meseca. Broj treba biti između 1 i 12.");
    }
    
    return meseci[numberOfTheMonth - 1];
  }

  static singleOrDefault = <T>(array: T[], predicate: (item: T) => boolean): T | undefined => {
    const filtered = array.filter(predicate);
    if (filtered.length > 1) {
      throw new Error("Sequence contains more than one matching element.");
    }
    return filtered[0];
  };

  static pushAction(cols: Column[], action: Action){
    const actionsColumn = SoftGlobal.singleOrDefault(cols, x => x.actions != null);
    if (actionsColumn) {
        actionsColumn.actions = [...actionsColumn.actions, action];
    }
  }

  static deleteAction(cols: Column[], actionField: string): void {
    const actionsColumn = SoftGlobal.singleOrDefault(cols, x => x.actions != null);

    if (actionsColumn && actionsColumn.actions) {
      const index = actionsColumn.actions.findIndex(a => a.field === actionField);
      if (index !== -1) {
        actionsColumn.actions.splice(index, 1);
      }
    }
  }

}