import { SectionIdEnum } from "@/types";
import { Box, Container } from "@mui/material";

export type SectionContainerProps = {
  children: React.ReactNode;
  sectionId: SectionIdEnum;
}

export const SectionContainer: React.FC<SectionContainerProps> = ({ children, sectionId }) => {
  return (
    <div id={sectionId} key={sectionId}>
      <Container
        disableGutters
        // maxWidth={sectionId === 'intro' ? false : undefined}
        maxWidth={ false }
        sx={{ margin: 0 }}
      >
        <Box
          minHeight="100vh"
          display={sectionId === 'intro' ? 'relative' : undefined}
        >
          {children}
        </Box>
      </Container>
    </div>
  );
};
