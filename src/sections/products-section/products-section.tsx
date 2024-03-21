import { Box, Typography } from "@mui/material"
import { useGetGroupQuery } from "@/state";
import { GroupCard } from './components/group-card.component';
import React, { useState } from 'react';
import { ProductsModal } from "./components/products-modal.component";
import { GroupCardLoading } from "./components/group-card-loading.component";

const today = new Date();

export const ProductionSection: React.FC = () => {
  const {data: groupData, isLoading: groupIsLoading} = useGetGroupQuery({ partner_id: "0933807030" });
  
  const [open, setOpen] = useState<boolean>(false);
  const [groupbuyId, setGroupbuyId] = useState('');

  const handleClose = () => setOpen(false);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      minHeight="100vh"
      pt="5rem"
      mx="1rem"
      mb="5rem"
    >
      <Typography
        variant="h1"
        fontWeight={800}
        letterSpacing={24}
        color="primary.mellow"
      >
        商品清單
      </Typography>
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(15rem, 1fr))"
        gap="2.5rem"
        mt="5rem"
      >
        {groupIsLoading && (
          Array.from(Array(2).keys()).map((item: number) => (
            <GroupCardLoading item={item} key={item}/>
          ))
        )}
        <ProductsModal
          isOpen={open}
          onClose={handleClose}
          groupbuyId={groupbuyId}
        />
        {!groupIsLoading && groupData?.success && groupData?.data.map((item) => {
          let isGroupValid: boolean | null = null;

          if (item?.end_at) {
            const { end_at } = item;
            const endAtString = end_at.replace(" ", "T");
            const endDate = new Date(endAtString); 
            if (today < endDate ) {
              isGroupValid = true;
            }
          }

          return (
            <GroupCard
              isGroupValid={isGroupValid}
              item={item}
              setOpenState={setOpen}
              setGroupbuyIdState={setGroupbuyId}
              key={item.id}
            />
        )})}
      </Box>
    </Box> 
  );
};
