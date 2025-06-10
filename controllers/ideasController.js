const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getIdeas = async (req, res) => {
  try {
    const ideas = await prisma.idea.findMany({
      include: {
        createdBy: true,
        comments: true,
      },
      orderBy: { votes: 'desc' },
    });
    res.json(ideas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createIdea = async (req, res) => {
  const { title, description, createdById } = req.body;
  try {
    const newIdea = await prisma.idea.create({
      data: {
        title,
        description,
        createdById: Number(createdById),
      },
    });
    res.status(201).json(newIdea);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getIdeaById = async (req, res) => {
  try {
    const idea = await prisma.idea.findUnique({
      where: { id: Number(req.params.id) },
      include: {
        createdBy: true,
        comments: true,
      },
    });
    if (!idea) return res.status(404).json({ error: "Idea not found" });
    res.json(idea);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.voteIdea = async (req, res) => {
  const ideaId = Number(req.params.id);
  const { userName } = req.body;

  if (!userName) {
    return res.status(400).json({ error: "userName is required" });
  }

  try {
    const idea = await prisma.idea.findUnique({
      where: { id: ideaId },
    });

    if (!idea) {
      return res.status(404).json({ error: "Idea not found" });
    }

    if (idea.votedBy.includes(userName)) {
      return res.status(400).json({ error: "User has already voted for this idea" });
    }

    const updatedIdea = await prisma.idea.update({
      where: { id: ideaId },
      data: {
        votes: { increment: 1 },
        votedBy: { set: [...idea.votedBy, userName] },
      },
    });

    res.json({ votes: updatedIdea.votes, votedBy: updatedIdea.votedBy });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addComment = async (req, res) => {
  const { userId, message } = req.body;
  try {
    const comment = await prisma.comment.create({
      data: {
        ideaId: Number(req.params.id),
        userId: Number(userId),
        message,
      },
    });
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};