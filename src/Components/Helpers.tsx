import { CloseIcon, LinkIcon, QuestionIcon } from "@chakra-ui/icons";
import { Avatar, Box, Flex, Select, Text } from "@chakra-ui/react";
import { useState } from "react";
import { listItem, tagContainer } from "./style";

export const RenderList = ({
  listItems,
  isFilterApplied,
  selectItem,
  accessLevel,
}: {
  listItems: any;
  isFilterApplied: boolean;
  selectItem: any;
  accessLevel: string;
}) => {
  return (
    <Flex marginLeft={isFilterApplied ? "0" : "4"} flexDirection='column'>
      {listItems &&
        listItems.map((item: any) => (
          <Flex
            onClick={() => selectItem({ ...item, access: accessLevel })}
            key={item?.id}
            marginBottom='3'
            cursor='pointer'
            style={isFilterApplied ? listItem : {}}
          >
            <Avatar
              size='sm'
              name={item.name}
              marginRight='2'
              src={item.imgSrc}
            />
            <Text marginTop='4px'>{item.name}</Text>
          </Flex>
        ))}
    </Flex>
  );
};

export const RenderTag = ({
  name,
  removeItem,
}: {
  name: string;
  removeItem: () => void;
}) => {
  return (
    <Flex justifyContent='space-between' style={tagContainer}>
      <Text>{name}</Text>
      <CloseIcon
        onClick={removeItem}
        cursor='pointer'
        w={3}
        h={3}
        style={{ margin: "6 10 0 8" }}
      />
    </Flex>
  );
};

export const ChooseAccess = ({
  access = "full_access",
  onChange,
  width = "100px",
}: {
  access?: string;
  onChange?: (input: string) => void;
  width?: string;
}) => {
  const [value, setValue] = useState(access);
  return (
    <Select
      alignSelf='center'
      size={"xs"}
      width={width}
      variant='unstyled'
      value={value}
      onChange={(event: any) => {
        setValue(event.target.value);
        if (onChange) {
          onChange(event.target.value);
        }
      }}
    >
      <option value='full_access'>Full Access</option>
      <option value='view'>Can View</option>
      <option value='edit'>Can Edit</option>
      <option value='no_access'>No Access</option>
    </Select>
  );
};

export const Footer = ({ needCopyLink = true }: { needCopyLink?: boolean }) => (
  <Flex
    paddingTop='3'
    paddingBottom='3'
    borderBottom='1px solid #D1D5DB'
    bgColor='#F9FAFB'
  >
    <Box w='30px'>
      <QuestionIcon />
    </Box>
    <Box w='400px'>
      <Text align='left' fontWeight='300'>
        learn about sharing
      </Text>
    </Box>

    {needCopyLink && (
      <Flex
        marginRight='10px'
        justifyContent={"space-around"}
        w='100px'
        as={"a"}
      >
        <LinkIcon marginTop='4px' />
        <Text>Copy link</Text>
      </Flex>
    )}
  </Flex>
);
