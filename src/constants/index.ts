import OslashLogo from "../assets/OslashLogo.jpg";

export type invitedPeopleSchemaType = {
  name: string;
  id: string;
  imgSrc: any;
  mail: any;
  access?: string;
};

type peoplesSchemaType = {
  groupName: string;
  id: string;
  items: invitedPeopleSchemaType[];
};

export const peoplesSchema: any = [
  {
    groupName: "person",
    id: "001",
    items: [
      {
        name: "Wade Cooper",
        mail: "wade@test.com",
        id: "123",
        imgSrc: "https://bit.ly/dan-abramov",
      },
      {
        name: "Arlene Mccoy",
        mail: "arlene@test.com",
        id: "124",
        imgSrc: "https://bit.ly/kent-c-dodds",
      },
      {
        name: "Tom cook",
        mail: "tomcook@test.com",
        id: "125",
        imgSrc: "https://bit.ly/prosper-baba",
      },
    ],
  },
  {
    groupName: "group",
    id: "002",
    items: [
      {
        name: "Product",
        id: "126",
        mail: [
          "wade@test.com",
          "arlene@test.com",
          "xyz@gmail.com",
          "test@tst.com",
        ],
      },
      {
        name: "Engineering",
        id: "127",
        mail: [
          "wade@test.com",
          "arlene@test.com",
          "xyz@gmail.com",
          "test@tst.com",
          "eng@teset.com",
          "admineng@test.com",
        ],
      },
    ],
  },
];

export const invitedPeopleSchema: invitedPeopleSchemaType[] = [
  {
    name: "Everyone at OSlash",
    id: "483",
    imgSrc: OslashLogo,
    mail: [
      "wade@test.com",
      "arlene@test.com",
      "xyz@gmail.com",
      "test@tst.com",
      "eng@teset.com",
      "admineng@test.com",
      "ssd",
      "asd",
      "as",
      "ds",
      "sd",
      "ee",
      "eew",
    ],
    access: "no_access",
  },
];
