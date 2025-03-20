import { useEffect, useState } from 'react';
import axiosInstance from '../../../axiosInstance';
import { useParams } from 'react-router-dom';
import ParticipantsList from '../../organisms/ParticipantsList/ParticipantsList';
import { Box, Container, Heading, Stack } from '@chakra-ui/react';

function Participants() {
  const [waitingParticipants, setWaitingParticipants] = useState([]);
  const [completedParticipants, setCompletedParticipants] = useState([]);

  const { id } = useParams();

  async function fetchPromoParticipants(promoId: string | undefined) {
    const response = await axiosInstance.get(
      `${import.meta.env.VITE_API}/participants/promo/${promoId}`
    );

    if (response.status === 200) {
      const participants = response.data.Users;

      console.log('participants', participants);

      setWaitingParticipants(
        participants.filter(
          (participant) => !participant.Participant.isParticipated
        )
      );
      setCompletedParticipants(
        participants.filter(
          (participant) => participant.Participant.isParticipated
        )
      );
    } else {
      setWaitingParticipants([]);
      setCompletedParticipants([]);
    }
  }

  useEffect(() => {
    fetchPromoParticipants(id);
  }, []);

  const deleteParticipantHandler = async (userId: number) => {
    console.log('del');
    console.log('userId', userId);
    console.log('promoId', id);

    const response = await axiosInstance.delete(
      `${import.meta.env.VITE_API}/participants/${id}/${userId}`
    );
    if (response.status === 200) {
      await fetchPromoParticipants(id);
    }
  };

  const toggleParticipantHandler = async (participant) => {
    console.log('toggle', participant);
    console.log('toggle', participant.Participant.id);

    const response = await axiosInstance.patch(
      `${import.meta.env.VITE_API}/participants/${participant.Participant.id}`,
      { isParticipated: !participant.Participant.isParticipated }
    );
    console.log('toggle response', response);
    if (response.status === 200) {
      await fetchPromoParticipants(id);
    }
  };

  return (
    <>
      <Box bgColor={'white'}>
        <Container
          maxW={'8xl'}
          as={Stack}
          position={'relative'}
          overflow={'hidden'}
        >
          <Stack spacing={{ base: '2em' }} my={{ base: 10 }}>
            <Heading as="h3" size="md" textAlign={'center'}>
              Ожидают подтверждения
            </Heading>

            <ParticipantsList
              participants={waitingParticipants}
              onDelete={deleteParticipantHandler}
              onToggleParticipant={toggleParticipantHandler}
            />

            <Heading as="h3" size="md" textAlign={'center'}>
              Подтвержденные
            </Heading>

            <ParticipantsList
              participants={completedParticipants}
              onDelete={deleteParticipantHandler}
              onToggleParticipant={toggleParticipantHandler}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
}

export default Participants;
