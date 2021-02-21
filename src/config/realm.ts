import Realm from 'realm';
export interface IProgram {
  id: string;
  title: string;
  thumbnailUrl: string;
  currentTime: number;
  duration: number;
}

class Program {
  static schema = {
    name: 'Progrom',
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
    },
  };
}

const realm = new Realm({
  schema: [Program],
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
