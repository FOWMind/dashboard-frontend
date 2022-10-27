import styled from "styled-components";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Image } from "../Layout/Image";
import { DashboardButton } from "../Layout/DashboardButton";
import { DashboardTitle } from "../Layout/DashboardTitle";
import { Error } from "../Layout/Error";

export default function DashboardViewSingleWork() {
  const { id } = useRouter().query;
  const [isFetching, setFetching] = useState(false);
  const [work, setWork] = useState({});
  const [deleteWorkModal, setDeleteWorkModal] = useState(false);
  const [deleteWorkError, setDeleteWorkError] = useState();

  useEffect(() => {
    if (id) {
      fetch(`/api/work/${id}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          return setWork(undefined);
        })
        .then((data) => {
          if (data) return setWork(data);
        })
        .catch((err) => console.error(err));
    }
  }, [id]);

  const ShowDeleteWorkModal = () => {
    setDeleteWorkModal(true);
  };

  const HideDeleteWorkModal = () => {
    setDeleteWorkModal(false);
  };

  const DeleteThisWork = () => {
    setDeleteWorkModal(false);
    if (isFetching) return;

    setFetching(true);
    fetch(`/api/work/${work._id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setDeleteWorkError(null);
          return window.location.replace("/");
        }
        return setDeleteWorkError(
          "No se pudo eliminar el trabajo. Intenta recargar la página y probar de nuevo."
        );
      })
      .finally(() => setFetching(false));
  };

  return (
    <>
      {work === undefined && (
        <>
          <Head>
            <title>No se encontró el trabajo - Dashboard</title>
          </Head>
          <h1>No se encontró el trabajo</h1>
        </>
      )}

      {work && Object.entries(work).length > 0 && (
        <Container>
          <Head>
            <title>{work.editedTitle} - Dashboard</title>
          </Head>

          <WorkImage
            src={work.featuredImage}
            alt="Imagen destacada del trabajo"
          />
          <WorkTitle>{work.editedTitle}</WorkTitle>

          <WorkMetaInfoContainer>
            <WorkMetaInfoItem>
              Categoría:{" "}
              <WorkMetaInfoItemFeatured>
                {work.category}
              </WorkMetaInfoItemFeatured>
            </WorkMetaInfoItem>
            <WorkMetaInfoItem>
              Creado:{" "}
              <WorkMetaInfoItemFeatured>
                {new Date(work.date).toLocaleString()}
              </WorkMetaInfoItemFeatured>
            </WorkMetaInfoItem>
            {work.editAt && (
              <WorkMetaInfoItem>
                Editado:{" "}
                <WorkMetaInfoItemFeatured>
                  {new Date(work.editAt).toLocaleString()}
                </WorkMetaInfoItemFeatured>
              </WorkMetaInfoItem>
            )}
          </WorkMetaInfoContainer>

          {work.images && (
            <WorkImages>
              {work.images.map((image, index) => (
                <WorkImagesItem
                  key={index}
                  src={image}
                  alt="Imagen secundaria del trabajo"
                />
              ))}
            </WorkImages>
          )}

          {work.videos && (
            <WorkVideos>
              {work.videos.map((video, index) => (
                <WorkVideosItem
                  key={index}
                  width="456"
                  height="250"
                  src={video}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></WorkVideosItem>
              ))}
            </WorkVideos>
          )}

          {work?.repository && (
            <WorkLinks>
              {work?.repository?.url && (
                <WorkLinkContainer>
                  URL Repositorio:{" "}
                  <WorkLink href={work.repository.url} target="_blank">
                    {work.repository.url}
                  </WorkLink>
                </WorkLinkContainer>
              )}
              {work?.repository?.demoUrl && (
                <WorkLinkContainer>
                  URL Demo Repositorio:{" "}
                  <WorkLink href={work.repository.demoUrl} target="_blank">
                    {work.repository.demoUrl}
                  </WorkLink>
                </WorkLinkContainer>
              )}
            </WorkLinks>
          )}

          {work.notes && (
            <WorkNotes>
              {work.notes.map((note, index) => (
                <WorkNote key={index}>{note}</WorkNote>
              ))}
            </WorkNotes>
          )}

          <Link href={`/work/edit/${work._id}`} passHref>
            <DashboardButtonLink>Editar</DashboardButtonLink>
          </Link>

          <DeleteWorkButton onClick={ShowDeleteWorkModal}>
            Eliminar trabajo
          </DeleteWorkButton>
          {deleteWorkModal && (
            <>
              <DeleteWorkOverlay onClick={HideDeleteWorkModal} />
              <DeleteWorkModal>
                <DeleteWorkModalText>
                  ¿Confirmas que quieres eliminar el trabajo?
                </DeleteWorkModalText>
                <DeleteWorkButton onClick={DeleteThisWork}>
                  Eliminar
                </DeleteWorkButton>
                <DashboardButton onClick={HideDeleteWorkModal}>
                  Cancelar
                </DashboardButton>
              </DeleteWorkModal>
            </>
          )}
          {deleteWorkError && !isFetching && (
            <DeleteWorkError>{deleteWorkError}</DeleteWorkError>
          )}
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  max-width: 1000px;
`;

const WorkImage = styled(Image)`
  border: 5px solid #181616;
  border-radius: 5px;
  max-width: 1000px;
`;

const WorkTitle = styled(DashboardTitle)`
  margin-top: 1rem;
  font-size: 2.5rem;
`;

const WorkMetaInfoContainer = styled.div`
  margin-top: 0.5rem;
`;

const WorkMetaInfoItem = styled.span`
  color: #888;
  font-size: 0.9rem;
  font-weight: 500;
  margin-right: 1rem;
  margin-bottom: 1rem;
`;

const WorkMetaInfoItemFeatured = styled.strong`
  color: #181616;
`;

const WorkImages = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-top: 1rem;
`;

const WorkImagesItem = styled(Image)`
  width: 32%;
  height: 150px;
  margin-right: 1.33%;
  margin-bottom: 1.33%;
  object-fit: contain;
  background-color: #f1f1f1;
  border-radius: 5px;
  padding: 0.5rem;
`;

const WorkVideos = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-top: 1rem;
`;

const WorkVideosItem = styled.iframe`
  width: 100%;
  margin-bottom: 1%;
  object-fit: contain;
  border-radius: 5px;

  @media screen and (min-width: 501px) {
    width: 49%;
    margin-right: 1%;
  }
`;

const WorkLinks = styled.div`
  margin: 1rem 0;
`;

const WorkLinkContainer = styled.div`
  margin-bottom: 0.5rem;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const WorkLink = styled.a`
  font-weight: 500;
  display: inline-block;
  color: #009a98;

  &:hover {
    text-decoration: underline;
  }
`;

const WorkNotes = styled.ul`
  color: #181616;
  margin: 1rem 0;
`;

const WorkNote = styled.li`
  margin: 0 0.5rem 0.5rem 0;
  background-color: #f1f1f1;
  border-radius: 5px;
  display: inline-block;
  padding: 0.5rem;
`;

const DeleteWorkButton = styled(DashboardButton)`
  background-color: #f32013;

  &:hover {
    background-color: #cc190e;
  }
`;

const DeleteWorkOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
`;

const DeleteWorkModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 5;
  transform: translate(-50%, -50%);
  padding: 1rem;
  border-radius: 5px;
  background-color: #f1f1f1;

  & > button {
    margin: 0 0.5rem 0.5rem 0;

    &:last-of-type {
      margin-bottom: 0;
    }

    @media screen and (min-width: 501px) {
      margin-bottom: 0;
    }
  }
`;

const DeleteWorkModalText = styled.p`
  color: #181616;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const DeleteWorkError = styled(Error)`
  margin-top: 0.5rem;
`;

const DashboardButtonLink = styled(DashboardButton).attrs({
  as: "a",
})`
  margin-right: 0.5rem;
`;
