export type pokemon ={
  name: string;
  url: string;
};

export type pokemonsdetalle = {
  id: number;
  name: string;

  sprites: {
    front_default: string;
   
  };

  types: {
    slot: number;
    type: {
      name: string;
    };
  }[];

  height: number;
  weight: number;

  abilities: {
    ability: {
      name: string;
    };
  }[];

  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
};