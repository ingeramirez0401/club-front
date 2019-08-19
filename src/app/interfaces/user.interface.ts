export interface UserProfileModel  {
    userId: number;
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    genreId: number;
    genreName: string;
    countryId: number;
    countryName: string;
    departmentId: number;
    departmentName: string;
    cityId: number;
    cityName: string;
    fullName: string;
    category: string;
    role: string;
    userEmail: string;
    auth_token: any;
    password: string;
    imageUrl: string;
    menu: any;
}

export interface UserModel {
    userId: number;
    personId: number;
    firstName: string;
    lastName: string;
    countryId: string;
    departmentId: string;
    cityId: string;
    documentTypeId: number;
    document: string;
    genreId: number;
    dateOfBirth: string;
    address: string;
    phone: string;
    cellPhone: string;
    email: string;
    password: string;
  }
