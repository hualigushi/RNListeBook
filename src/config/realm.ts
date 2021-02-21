import Realm from 'realm';
export interface IProgram {
  id: string;
  title: string;
  thumbnailUrl: string;
  currentTime: number;
  duration: number;
  rate: number;
}

class Program {
  static schema = {
    name: 'Program',
    primaryKey: 'id',
    properties: {
      id: 'string',
      title: 'string',
      thumbnailUrl: 'string',
      currentTime: {
        type: 'double',
        default: 0,
      },
      duration: {
        type: 'double',
        default: 0,
      },
      rate: {
        type: 'double',
        default: 0,
      },
    },
  };

  // get rate() {
  //   return this.duration > 0
  //     ? Math.floor(((this.currentTime * 100) / this.duration) * 100) / 100
  //     : 0;
  // }
}

const realm = new Realm({
  schema: [Program],
  schemaVersion: 1,
  migration: (oldReaml, newRealm) => {
    if (oldReaml.schemaVersion < 1) {
      const oldObject = oldReaml.objects<IProgram>('Program');
      const newObject = newRealm.objects<IProgram>('Program');
      for (let i = 0; i < oldObject.length; i++) {
        newObject[i].rate =
          Math.floor(
            ((oldObject[i].currentTime * 100) / oldObject[i].duration) * 100,
          ) / 100;
      }
    }
  },
});

export function saveProgram(data: Partial<IProgram>) {
  try {
    realm.write(() => {
      realm.create('Program', data, Realm.UpdateMode.All);
    });
  } catch (err) {
    console.log('reaml save failed');
  }
}
export default realm;
