import { StyleSheet } from '@react-pdf/renderer';
import type { ThemeTokens } from '@/resume/themes';

export function makeStyles(theme: ThemeTokens) {
  const c = theme.colors;
  const t = theme.type;
  const s = theme.spacing;

  return StyleSheet.create({
    page: {
      paddingTop: s.page,
      paddingBottom: s.page + 14,
      paddingHorizontal: s.page,
      backgroundColor: c.bg,
      color: c.textPrimary,
      fontFamily: theme.fonts.body,
      fontSize: t.body,
      lineHeight: 1.4,
    },
    columns: {
      flexDirection: 'row',
      gap: 18,
    },
    leftCol: {
      width: 170,
      gap: s.section,
    },
    rightCol: {
      flex: 1,
      gap: s.section,
    },

    /* Header */
    header: {
      flexDirection: 'row',
      gap: 12,
      alignItems: 'flex-start',
    },
    avatar: {
      width: 56,
      height: 56,
      borderRadius: 28,
    },
    headerText: { flex: 1, gap: 2 },
    name: {
      fontFamily: theme.fonts.heading,
      fontSize: t.name,
      fontWeight: 600,
      color: c.textPrimary,
      lineHeight: 1.15,
      letterSpacing: theme.id === 'mono' ? 0 : -0.4,
    },
    login: {
      fontSize: t.small,
      color: c.textMuted,
      fontFamily: theme.fonts.mono,
    },
    metaRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
      marginTop: 4,
      fontSize: t.small,
      color: c.textMuted,
    },
    metaItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 3,
    },

    /* Summary */
    bio: {
      fontSize: t.body,
      fontStyle: 'italic',
      color: c.textPrimary,
      lineHeight: 1.45,
    },

    /* Section title */
    sectionTitle: {
      fontFamily: theme.fonts.heading,
      fontSize: t.section,
      fontWeight: theme.id === 'mono' ? 500 : 600,
      letterSpacing: theme.id === 'mono' ? 0 : 1.4,
      textTransform: 'uppercase',
      color: c.textPrimary,
      marginBottom: 6,
    },
    sectionTitleTopRule: {
      fontFamily: theme.fonts.heading,
      fontSize: t.section,
      fontWeight: 600,
      letterSpacing: 1.4,
      textTransform: 'uppercase',
      color: c.textPrimary,
      marginBottom: 6,
      paddingTop: 6,
      borderTopWidth: theme.rules.weight,
      borderTopColor: c.rule,
    },

    /* Stats */
    statsRow: {
      flexDirection: 'row',
      gap: 6,
      paddingTop: 8,
      borderTopWidth: theme.rules.weight,
      borderTopColor: c.rule,
    },
    statBox: {
      flex: 1,
    },
    statLabel: {
      fontSize: 6.5,
      letterSpacing: 1.2,
      textTransform: 'uppercase',
      color: c.textMuted,
      fontFamily: theme.fonts.mono,
    },
    statValue: {
      fontFamily: theme.fonts.heading,
      fontSize: 12,
      fontWeight: 600,
      color: c.textPrimary,
      marginTop: 1,
    },

    /* Languages */
    langBar: {
      flexDirection: 'row',
      width: '100%',
      height: 5,
      borderRadius: 3,
      overflow: 'hidden',
      marginBottom: 6,
      backgroundColor: c.chipBg,
    },
    langSegment: { height: '100%' },
    legendRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      fontSize: t.small,
    },
    legendItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 3,
    },
    swatch: { width: 5, height: 5, borderRadius: 2.5 },

    /* Repo cards */
    pinnedGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 6,
    },
    pinnedCard: {
      width: '49%',
      borderWidth: theme.rules.weight,
      borderColor: c.rule,
      borderRadius: theme.id === 'mono' ? 0 : 4,
      padding: 7,
      gap: 3,
    },
    pinnedHeader: { flexDirection: 'row', justifyContent: 'space-between', gap: 6 },
    repoName: {
      fontFamily: theme.fonts.heading,
      fontSize: t.body + 0.5,
      fontWeight: 600,
      color: c.accent,
    },
    repoMeta: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      fontSize: t.small,
      color: c.textMuted,
    },
    repoDescription: {
      fontSize: t.small + 0.5,
      lineHeight: 1.35,
      color: c.textPrimary,
    },

    /* Top repos list */
    topRepoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      paddingVertical: 3,
      borderBottomWidth: theme.rules.weight,
      borderBottomColor: c.rule,
      gap: 8,
    },
    topRepoLeft: { flex: 1, flexDirection: 'row', flexWrap: 'wrap', gap: 4 },
    topRepoMeta: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      fontSize: t.small,
      color: c.textMuted,
    },

    /* Orgs */
    orgGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 4 },
    orgChip: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 3,
      backgroundColor: c.chipBg,
      paddingVertical: 2,
      paddingHorizontal: 4,
      borderRadius: theme.id === 'mono' ? 0 : 3,
    },
    orgAvatar: { width: 10, height: 10, borderRadius: 2 },
    orgName: { fontSize: t.small, color: c.chipText, fontWeight: 500 },

    /* Footer */
    footer: {
      position: 'absolute',
      left: s.page,
      right: s.page,
      bottom: 14,
      flexDirection: 'row',
      justifyContent: 'space-between',
      fontSize: t.small - 0.5,
      color: c.textMuted,
      borderTopWidth: theme.rules.weight,
      borderTopColor: c.rule,
      paddingTop: 4,
      fontFamily: theme.fonts.mono,
    },

    link: { color: c.accent, textDecoration: 'none' },
  });
}

export type ThemedStyles = ReturnType<typeof makeStyles>;
