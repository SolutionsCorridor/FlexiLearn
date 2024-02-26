export interface Teacher {
    id: number;
    name: string;
    address: string;
    subject: string;
    location?: google.maps.LatLngLiteral;
    distance?: number;
    gender:string;
    profileImg:string;
    reviews:number,
  }
  