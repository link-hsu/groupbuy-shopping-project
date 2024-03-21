import { createTheme } from '@mui/material/styles';
import { useMemo } from 'react';
import { HeaderMainLayout } from "@/header";
import { SectionContainer } from "@/sections";
import { SectionIdEnum } from "@/types";
// import { useGetLineBotQuery } from "./state/api";
import { themeSettings } from '@/theme';
import { ThemeProvider } from '@emotion/react';
import { Introsection, ProductionSection, MemberSection } from '@/sections';
import { Footer } from './footer';


const sections = [
  {
    sectionId: SectionIdEnum.intro,
    component: <Introsection />,
  },
  {
    sectionId: SectionIdEnum.products,
    component: <ProductionSection />,
  },
  {
    sectionId: SectionIdEnum.member,
    component: <MemberSection />,
  },
];

export const Home: React.FC = () => {
  const theme = useMemo(() => createTheme(themeSettings), []);
  // const { data, isLoading } = useGetLineBotQuery();
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <HeaderMainLayout>
          {sections.map(({ sectionId, component }) => (
            <SectionContainer
              sectionId={sectionId}
              key={sectionId}
            >
              {component}
            </SectionContainer>
          ))}
        </HeaderMainLayout>
        <Footer />
      </ThemeProvider>
    </div>
  );
};
