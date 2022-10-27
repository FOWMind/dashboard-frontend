import Link from "next/link";
import styled from "styled-components";

export default function DashboardSingleWork({ _id, title, featuredImage }) {
  return (
    <WorkContainer>
      {featuredImage && (
        <Link href={`/work/${_id}`} passHref>
          <WorkLink>
            <WorkImage src={featuredImage} alt="" />
          </WorkLink>
        </Link>
      )}
      <WorkName>{title}</WorkName>
      <WorkLink href={`/work/edit/${_id}`}>Editar</WorkLink>
      <WorkLink href={`/work/${_id}`}>Ver</WorkLink>
    </WorkContainer>
  );
}

const WorkContainer = styled.div`
  display: block;
  width: 100%;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 10px;
  background-color: #f2f2f2;

  @media screen and (min-width: 600px) and (max-width: 1023px) {
    width: 49%;
    margin-right: 2%;

    &:nth-of-type(2n) {
      margin-right: 0;
    }
  }

  @media screen and (min-width: 1024px) and (max-width: 1359px) {
    width: 32%;
    margin-right: 2%;

    &:nth-of-type(3n) {
      margin-right: 0;
    }
  }

  @media screen and (min-width: 1360px) {
    width: 24%;
    margin-right: 1.33%;

    &:nth-of-type(4n) {
      margin-right: 0;
    }
  }
`;

const WorkImage = styled.img`
  width: 100%;
  display: block;
  border-radius: 20px;
  object-fit: contain;
  margin-bottom: 0.5rem;
`;

const WorkName = styled.div`
  font-size: 1rem;
  font-weight: 700;
  display: block;
  margin-bottom: 0.25rem;
  overflow: auto;
`;

const WorkLink = styled.a`
  text-decoration: none;
  font-weight: 500;
  color: #009a98;
  margin-right: 0.5rem;

  &:hover {
    text-decoration: underline;
    color: #000;
  }
`;
