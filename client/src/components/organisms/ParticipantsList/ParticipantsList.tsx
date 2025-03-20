import { Box, Button, Stack, Text } from '@chakra-ui/react';
import { FaRegUser } from 'react-icons/fa';
import { MdAlternateEmail } from 'react-icons/md';

function ParticipantsList({ participants, onDelete, onToggleParticipant }) {
  return (
    <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
      <Text>Всего участников: {participants.length}</Text>
      {participants.map((participant, index: number) => (
        <Stack
          key={index}
          p="4"
          boxShadow="lg"
          borderRadius="sm"
          direction={{ base: 'column', sm: 'row' }}
          justify={'space-between'}
          align={{ base: 'flex-start', sm: 'center' }}
          maxW={'700px'}
          width={'full'}
        >
          <Box>
            <Text fontWeight="semibold" mb={1}>
              Участник {index + 1}
            </Text>
            <Text display={'flex'} alignItems={'center'}>
              <FaRegUser
                style={{
                  display: 'block',
                  width: '30px',
                  paddingRight: '10px',
                }}
              />
              {participant.username}
            </Text>
            <Text display={'flex'} alignItems={'center'}>
              <MdAlternateEmail
                style={{
                  display: 'block',
                  width: '30px',
                  paddingRight: '10px',
                }}
              />
              {participant.email}
            </Text>
          </Box>

          <Stack
            direction={{ base: 'column', lg: 'row' }}
            justify={{ base: 'center', lg: 'flex-start' }}
            width={{ base: '100%', sm: 'unset' }}
          >
            {participant.Participant.isParticipated ? (
              <>
                <Button
                  variant="outline"
                  colorScheme="customGreen"
                  rounded={'full'}
                  onClick={() => onToggleParticipant(participant)}
                >
                  Отменить
                </Button>
              </>
            ) : (
              <>
                <Button
                  colorScheme="customGreen"
                  rounded={'full'}
                  mr={{ base: 0, lg: 2 }}
                  onClick={() => onToggleParticipant(participant)}
                >
                  Подтвердить
                </Button>
                <Button
                  variant="outline"
                  colorScheme="customGreen"
                  rounded={'full'}
                  onClick={() => onDelete(participant.id)}
                >
                  Удалить
                </Button>
              </>
            )}
          </Stack>
        </Stack>
      ))}
    </Box>
  );
}

export default ParticipantsList;
