import {
  Avatar,
  Box,
  Button,
  Flex,
  Grid,
  Input,
  InputGroup,
  InputRightAddon,
  Switch,
  Text,
} from "@chakra-ui/react";
import { QuestionIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import {
  invitedPeopleSchema,
  invitedPeopleSchemaType,
  peoplesSchema,
} from "../constants";
import { GlobeIcon, ShareIcon, LinkIcon } from "./Icons";
import { RenderList, RenderTag, ChooseAccess, Footer } from "./Helpers";
import { shareBtn } from "./style";

const Share: React.FC = () => {
  const [input, setInput] = useState("");
  const [peoples, setPeoples] = useState(peoplesSchema);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [invitedPeople, setInvitedPeople] = useState(invitedPeopleSchema);

  const [showShareDetails, setShowShareDetails] = useState(false);
  const [showInviteScreen, setShowInviteScreen] = useState(false);

  const [accessLevel, setAccessLevel] = useState("no_access");

  useEffect(() => {
    if (selectedItem) {
      setSelectedItem({ ...selectedItem, access: accessLevel });
    }
  }, [accessLevel]);

  useEffect(() => {
    let filteredList: any = [];
    peoplesSchema.forEach((people: any) => {
      const filteredItems = people.items.filter((peopleObj: any) =>
        peopleObj.name
          .toLowerCase()
          .replace(/ /g, "")
          .includes(input.replace(/ /g, "").toLowerCase())
      );
      if (filteredItems.length > 0) {
        filteredList = [
          ...filteredList,
          { ...people, items: [...filteredItems] },
        ];
      }
    });

    setPeoples(filteredList);
  }, [input]);

  const submit = (event: any) => {
    if (event.key === "Enter") {
      if (peoples && peoples.length === 1) {
        setSelectedItem({ ...peoples[0].items[0], access: accessLevel });
      }
    }
  };

  const removeItem = () => {
    setPeoples(peoplesSchema);
    setSelectedItem(null);
    setInput("");
  };

  const invitePeoples = () => {
    setInvitedPeople([...invitedPeople, { ...selectedItem }]);
    setShowInviteScreen(false);
    removeItem();
  };

  return (
    <Flex flexDirection='column'>
      <Flex>
        <Button
          style={shareBtn}
          rightIcon={<ShareIcon />}
          size='md'
          colorScheme='teal'
          variant='outline'
          onClick={() => setShowShareDetails(true)}
        >
          Share
        </Button>
      </Flex>
      {showShareDetails && !showInviteScreen && (
        <Flex>
          <Box
            borderWidth='1px'
            borderRadius='lg'
            overflow='hidden'
            marginTop={"2"}
          >
            <Flex
              paddingTop='6'
              paddingBottom='6'
              borderBottom='1px solid #D1D5DB'
            >
              <Box w='70px'>
                <GlobeIcon fontSize='40px' />
              </Box>
              <Box w='400px'>
                <Text align='left' fontWeight='600'>
                  Share to web
                </Text>
                <Text fontSize={"md"} fontWeight='300' textAlign={"left"}>
                  Publish and share link with anyone
                </Text>
              </Box>
              <Box w='60px' marginTop={"10px"}>
                <Switch size='lg' />
              </Box>
            </Flex>

            <Grid padding='3' borderBottom='1px solid #D1D5DB'>
              <InputGroup size='md' onClick={() => setShowInviteScreen(true)}>
                <Input placeholder='People, emails, groups' />
                <InputRightAddon children='Invite' />
              </InputGroup>
              <Flex justifyContent='space-between' flexDirection='column'>
                {invitedPeople &&
                  invitedPeople.map((invitePeople: invitedPeopleSchemaType) => {
                    const { id, name, mail, access, imgSrc } = invitePeople;
                    return (
                      <Flex key={id} justifyContent='space-between'>
                        <Flex margin='2'>
                          <Avatar
                            size='sm'
                            name={name}
                            marginRight='2'
                            marginTop='2'
                            src={imgSrc}
                          />
                          <Box alignSelf='center'>
                            <Text align='left' fontWeight='500'>
                              {name}
                            </Text>
                            <Text
                              fontSize={"md"}
                              fontWeight='300'
                              textAlign={"left"}
                            >
                              {typeof mail === "string"
                                ? mail
                                : `${mail.length} workspace members`}
                            </Text>
                          </Box>
                        </Flex>

                        <ChooseAccess access={access} />
                      </Flex>
                    );
                  })}
              </Flex>
            </Grid>

            <Footer needCopyLink />
          </Box>
        </Flex>
      )}

      {showInviteScreen && (
        <Flex>
          <Box
            borderWidth='1px'
            borderRadius='lg'
            overflow='hidden'
            marginTop={"2"}
          >
            <Flex
              padding='2'
              bgColor='#F3F4F6'
              borderBottom='1px solid #D1D5DB'
              justifyContent='space-between'
            >
              <InputGroup>
                {selectedItem ? (
                  <RenderTag removeItem={removeItem} name={selectedItem.name} />
                ) : (
                  <Input
                    width='60%'
                    variant='unstyled'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setInput(e.target.value)
                    }
                    onKeyPress={submit}
                    value={input}
                    placeholder='Search emails, names or groups'
                  />
                )}
              </InputGroup>

              <ChooseAccess
                width='140px'
                onChange={setAccessLevel}
                access={accessLevel}
              />
              <Button
                disabled={!selectedItem}
                size='sm'
                bgColor='#fff'
                onClick={invitePeoples}
              >
                Invite
              </Button>
            </Flex>

            <Flex flexDirection='column' alignItems={"flex-start"} padding='6'>
              {peoples &&
                peoples.map((people: any) => {
                  const { groupName, items, id } = people;
                  return (
                    items.length > 0 && (
                      <React.Fragment key={id}>
                        <Text fontWeight='600' size='lg' marginBottom={"4"}>
                          Select a {groupName}
                        </Text>
                        <RenderList
                          isFilterApplied={input.length > 0}
                          listItems={items}
                          selectItem={setSelectedItem}
                          accessLevel={accessLevel}
                        />
                      </React.Fragment>
                    )
                  );
                })}
            </Flex>

            <Footer needCopyLink={false} />
          </Box>
        </Flex>
      )}
    </Flex>
  );
};

export default Share;
